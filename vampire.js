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
}

module.exports = Vampire;

