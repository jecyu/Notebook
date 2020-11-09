class Observer {
  constructor() {
    console.log("Observer created.");
  }

  update() {
    console.log("Observer.update invoked.");
  }
}

module.exports = Observer;
