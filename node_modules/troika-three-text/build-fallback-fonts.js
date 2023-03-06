const fetch = require('node-fetch')


const encodingRadix = 36

const gfontsRoot = 'https://fonts.gstatic.com/s/'

// User agents that force Google Fonts to serve CSS in certain ways:
const UAs = {
  // Serves .woff files split by unicode-ranges (Safari 11):
  ranged: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Safari/604.1.38',
  // Serves a single .woff file (IE 11):
  single: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko",
}

const cjkRanges = [
  [0x4E00, 0x9FFF],
  [0x3400, 0x4DBF],
  [0x20000, 0x2EBEF],
  [0x30000, 0x3134F],
  [0xF900, 0xFAFF],
  [0x2F800, 0x2FA1F],
  // [0x4E00, 0x9FFF], // CJK Unified Ideographs - Common
  // [0x3400, 0x4DBF], // CJK Unified Ideographs Extension A - Rare
  // [0x20000, 0x2A6DF], // CJK Unified Ideographs Extension B - Rare, historic
  // [0x2A700, 0x2B73F], // CJK Unified Ideographs Extension C - Rare, historic
  // [0x2B740, 0x2B81F], // CJK Unified Ideographs Extension D - Uncommon, some in current use
  // [0x2B820, 0x2CEAF], // CJK Unified Ideographs Extension E - Rare, historic
  // [0xF900, 0xFAFF],  // CJK Compatibility Ideographs - Duplicates, unifiable variants, corporate characters
  // [0x2F800, 0x2FA1F], // CJK Compatibility Ideographs Supplement
  // CJK and KangXi Radicals: U+2E80–U+2FD5
  // CJK Strokes: U+31C0–U+31EF
  // Vertical Forms (U+FE10..U+FE1F), was created for vertical punctuation compatibility characters from GB 18030. (no)
]

// Family names to fetch, in order
const families = {
  sans: [
    { name: 'Roboto', useRanges: false },
    { name: 'Noto Sans SC', useRanges: true, combine: true, rangeFilter: cjkRanges, lang: /^(?!ja\b|ko\b|zh-Hant)/i }, // fallback if a more specific cjk lang was not specified
    { name: 'Noto Sans TC', useRanges: true, combine: true, rangeFilter: cjkRanges, lang: /^zh-Hant$/i },
    { name: 'Noto Sans KR', useRanges: true, combine: true, rangeFilter: cjkRanges, lang: /^ko\b/ },
    { name: 'Noto Sans JP', useRanges: true, combine: true, rangeFilter: cjkRanges, lang: /^ja\b/ },
    { name: 'Noto Sans Arabic', useRanges: true },
    { name: 'Roboto', useRanges: true },
  ]
}


function parseCssFontFaces(css) {
  return css.split('@font-face').reduce((out, chunk) => {
    const url = chunk.match(/https?:[^)]*/)?.[0]
    if (url) {
      let encodedRanges, ranges
      const rangeString = chunk.match(/unicode-range:([^;]*)/)?.[1].trim() || undefined
      if (rangeString) {
        ranges = parseRangeString(rangeString)
        encodedRanges = encodeRanges(ranges)
      }
      out.push({
        src: url, // .replace(gfontsRoot, ''),
        rangeString,
        ranges,
        encodedRanges
      })
    }
    return out
  }, [])
}

function isInRanges(code, ranges) {
  for (const [start, end = start] of ranges) {
    if (code >= start && code <= end) {
      return true
    }
  }
  return false
}

function stringifyRanges(ranges) {
  let out = []
  ranges.forEach(d => {
    out.push(`U+${d[0].toString(16)}${d[0] !== d[1] ? `-${d[1].toString(16)}` : ''}`)
  })
  return out.join(',')
}

function parseRangeString(rangesStr) {
  return rangesStr.split(',').map(rangeStr => {
    const [start, end = start] = rangeStr.replace(/^\s*U\+|\s*$/, '').split('-').map(s => parseInt(s, 16))
    return [start, end]
  })
}

function collapseRanges(allRanges, slop = 0) {
  allRanges = allRanges.slice().sort((a, b) => a[0] - b[0])
  const collapsedRanges = [allRanges[0]]
  for (let i = 1; i < allRanges.length; i++) {
    const a = collapsedRanges[collapsedRanges.length - 1]
    const b = allRanges[i]
    // if (b[0] > 0xFAFF) break // ignore extensions
    if (b[0] <= a[1] + 1 + slop) { // adjacent or overlapping
      a[1] = Math.max(a[1], b[1])
    } else {
      collapsedRanges.push(b)
    }
  }
  return collapsedRanges
}

function encodeRanges(ranges) {
  let ch = 0
  return ranges.slice().sort((a, b) => a[0] - b[0]).map(range => {
    const [start, end = start] = range
    let out = (start - ch).toString(encodingRadix)
    ch = start
    if (end !== start) {
      out += `+${(end - ch).toString(encodingRadix)}`
      ch = end
    }
    return out
  }).join(',')
}

async function run() {
  const output = []

  for (const {name: family, useRanges, combine} of families.sans) {
    const css = await fetchWithUserAgent(family, useRanges? UAs.ranged : UAs.single)
    const combinedCss = useRanges && combine ? await fetchWithUserAgent(family, UAs.single) : css
    if (css) {
      const allRanges = []
      let fontFaces = parseCssFontFaces(css)
      if (combine) {
        const combinedRanges = collapseRanges(fontFaces.reduce((out, {ranges}) => {
          out.push(...ranges)
          return out
        }, []), 16)
        fontFaces = [{
          src: parseCssFontFaces(combinedCss)[0].src,
          ranges: combinedRanges,
          rangeString: stringifyRanges(combinedRanges),
          encodedRanges: encodeRanges(combinedRanges)
        }]
      }
      output.push(...fontFaces.map(d => ({src: d.src, unicodeRange: d.encodedRanges, rangeString: d.rangeString})))
      allRanges.push(fontFaces.map(d => d.ranges))

      // if (allRanges.length) {
      //   const collapsedRanges = collapseRanges(allRanges)
      //   console.log(`${family} collapsed ranges:\n${stringifyRanges(collapsedRanges)}`)
      // }

      // console.log(`${family} non-CJK:\n${stringifyRanges(nonCJKRanges)}`)

      // console.log(`${family} full range: ${min.toString(16)} - ${max.toString(16)}`)
    } else {
      fail(`Could not find font family ${family}. Check its spelling and case and that it exists on Google Fonts.`)
    }
  }

  const result = JSON.stringify(output, null, 2)
  console.log(result)
  console.log(JSON.stringify(output).length)
}

async function fetchWithUserAgent(family, userAgent) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}`, {
    "credentials": "omit",
    "headers": {
      "User-Agent": userAgent,
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      "Cache-Control": "max-age=0"
    },
    "method": "GET",
  })
  return response.ok ? await response.text() : null
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

run()
