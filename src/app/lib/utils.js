module.exports = {
  age: function age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    //2020 - 1997 = 23
    let age = today.getUTCFullYear() - birthDate.getFullYear();
    const month = today.getUTCMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getUTCDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  formatBrowser: (timestamp) => {
    const date = new Date(timestamp);
    const day = `0${date.getUTCDate()}`.slice(-2);
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const year = `${date.getUTCFullYear()}`;

    return {
      day: day,
      month: month,
      year: year,
      iso: `${year}-${month}-${day}`,
      birthday: `${day}/${month}`,
    };
  },

  positioningID: (array) => {
    if (array.length == 0 || (array.length == 1 && array[0].id != 1)) {
      return 1;
    }

    let positionsOfID = [];

    for (const user of array) {
      positionsOfID.push(user.id);
    }

    positionsOfID.sort((a, b) => {
      return a - b;
    });

    if (positionsOfID[0] != 1) return 1;

    for (let i = 0; i < positionsOfID.length; i++) {
      if (positionsOfID[i] - positionsOfID[i - 1] > 1) {
        return positionsOfID[i] - 1;
      } else if (i == positionsOfID.length - 1) {
        return positionsOfID[i] + 1;
      }
    }
  },
};
