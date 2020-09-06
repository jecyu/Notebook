Object.defineProperty(Date.prototype, "ago", {
  get: function() {
    const diff = (new Date().getTime() - this.getTime()) / 1000; // get seconds
    let dayDiff = Math.floor(diff / 86400); // get days
    return (
      (dayDiff === 0 && diff < 60 && "just now") ||
      (diff < 120 && "1 minute ago") ||
      (diff < 3600 && Math.floor(diff / 60) + "minutes ago") ||
      (diff < 7200 && "1 hour ago") ||
      (diff < 86400 && Math.floor(diff / 3600) + "hours ago") ||
      (dayDiff == 1 && "Yesterday") ||
      (dayDiff < 7 && dayDiff + "days ago") ||
      Math.ceil(dayDiff / 7) + "weeks ago"
    );
  },
});

const a = new Date("2018-11-22T09:30:00");
console.log(a.ago); // 91 weeks ago
