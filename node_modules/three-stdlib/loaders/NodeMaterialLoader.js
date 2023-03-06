import 'three';

class NodeMaterialLoaderUtils {
  static replaceUUIDObject(object, uuid, value, recursive) {
    recursive = recursive !== undefined ? recursive : true;
    if (typeof uuid === 'object') uuid = uuid.uuid;

    if (typeof object === 'object') {
      const keys = Object.keys(object);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (recursive) {
          object[key] = this.replaceUUIDObject(object[key], uuid, value);
        }

        if (key === uuid) {
          object[uuid] = object[key];
          delete object[key];
        }
      }
    }

    return object === uuid ? value : object;
  }

  static replaceUUID(json, uuid, value) {
    this.replaceUUIDObject(json, uuid, value, false);
    this.replaceUUIDObject(json.nodes, uuid, value);
    this.replaceUUIDObject(json.materials, uuid, value);
    this.replaceUUIDObject(json.passes, uuid, value);
    this.replaceUUIDObject(json.library, uuid, value, false);
    return json;
  }

}

export { NodeMaterialLoaderUtils };
