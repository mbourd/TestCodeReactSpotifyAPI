
class customMethod {
  randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  makeID = (length) => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

export default customMethod;
