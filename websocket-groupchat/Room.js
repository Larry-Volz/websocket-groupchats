/** Chat rooms that can be joined/left/broadcast to. */

// in-memory storage of roomNames -> room

const ROOMS = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** get room by that name, creating if nonexistent
   *
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the ROOMS variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   **/

  static get(roomName) {
    if (!ROOMS.has(roomName)) {
      //so ROOMS is a map of Room objects
      //with roomName for each key

      console.log(`2 Room.js: get(roomName) for one that has none`);

      ROOMS.set(roomName, new Room(roomName));
    }

    //return the object just created by roomName
    console.log(`3 Room.js: get(roomName) returns object roomName=${roomName}`);
    return ROOMS.get(roomName);
  }

  /** make a new room, starting with empty set of listeners */

  constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
  }

  /** member joining a room. */

  join(member) {
    //passed a ChatUser object(?)
    console.log(`Room.js: join(member) run member=${JSON.stringify(member)}`);

    this.members.add(member); 
  }

  /** member leaving a room. */

  leave(member) {
    console.log(`Room.js: leave(member) deleted JSON.stringify(member)=${JSON.stringify(member)}`);
    this.members.delete(member);
  }

  /** send message to all members in a room. */

  broadcast(data) {
    for (let member of this.members) {
      //using the .send method for each member object in the map
      console.log(`Room.js: broadcast(data) run JSON.stringify(data)=${JSON.stringify(data)}`);
      member.send(JSON.stringify(data));
    }
  }
}

module.exports = Room;
