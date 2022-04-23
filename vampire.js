class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator !== null) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.creator === null) return true;
    if (vampire.creator === null) return false;

    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisAncestorsLevel = this.numberOfVampiresFromOriginal;
    let vampireAncestorsLevel = vampire.numberOfVampiresFromOriginal;
    
    if (this.creator === null) return this;
    if (vampire.creator === null) return vampire;
    if (vampire === this) return this;

    if (thisAncestorsLevel === vampireAncestorsLevel) {
      return this.creator;
    }

    let youngerVampire = thisAncestorsLevel > vampireAncestorsLevel ? this : vampire;
    let olderVampire = youngerVampire === vampire ? this : vampire;
    
    if (youngerVampire.isDescendant(olderVampire)) {
      return olderVampire;
    }
    
    let currentLevel = youngerVampire.numberOfVampiresFromOriginal;
    let ancestor = null;

    while (currentLevel !== olderVampire.numberOfVampiresFromOriginal) {
      youngerVampire = youngerVampire.creator;
      currentLevel--;
    }

    while (!ancestor) {
      if (youngerVampire.creator === olderVampire.creator) {
        ancestor = youngerVampire.creator;
      }

      youngerVampire = youngerVampire.creator;
      olderVampire = olderVampire.creator;
    }

    return ancestor;
  }

  isDescendant(vampire) {
    let currentVampire = this;

    while (currentVampire !== null) {
      if (currentVampire === vampire) {
        return true;
      }

      currentVampire = currentVampire.creator;
    }

    return false;
  }

    // Returns the vampire object with that name, or null if no vampire exists with that name
    vampireWithName(name) {
      if (this.name === name) return this;

      for (const descendant of this.offspring) {
        const nameFound = descendant.vampireWithName(name);
        if (nameFound) return nameFound;
      }

      return null;
    }
  
    // Returns the total number of vampires that exist
    get totalDescendents() {
      let descendantCount = this.offspring.length;

      for (const descendant of this.offspring) {
        descendantCount += descendant.totalDescendents;
      }

      return descendantCount;
    }
  
    // Returns an array of all the vampires that were converted after 1980
    get allMillennialVampires() {
      let millennials = [];

      if (this.yearConverted > 1980) {
        millennials.push(this);
      }

      for (const descendant of this.offspring) {
        const millennialDescendants = descendant.allMillennialVampires;
        millennials = millennials.concat(millennialDescendants);
      }

      return millennials;
    }
}

module.exports = Vampire;

