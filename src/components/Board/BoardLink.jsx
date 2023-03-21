function BoardLink({
  /** link to be taken to on click */ href,
  /** text displayed */
  text,
}) {
  return (
    <div className='board-link-container'>
      <a className='board-link' href={href}>
        {text}
      </a>
    </div>
  );
}

export default BoardLink;
