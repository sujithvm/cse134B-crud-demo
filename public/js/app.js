Vue.use(VueFire);

var config = {
    apiKey: "AIzaSyCOtvp223FcWEE1YtDQOLmbm5swsAsm5kk",
    authDomain: "cse134b-demo.firebaseapp.com",
    databaseURL: "https://cse134b-demo.firebaseio.com",
    storageBucket: "cse134b-demo.appspot.com",
    messagingSenderId: "314223225958"
  };

var app = firebase.initializeApp(config);
var db = app.database()
var ref = db.ref('playlists');

window.addEventListener('load', function () {
   var vm = new Vue({
	  el: "#app",
	  data: {
	    name: "",
	    theme: "",
	    url: ""
	  },
	  firebase: {
	    playlists: ref
	  }, 
	  methods: {
	    removePlaylist: function (key) {
	      ref.child(key).remove();
	    },
	    addPlaylist: function () {
	    	if (this.name.trim() && this.theme.trim() && this.url.trim()) {
	    		ref.push({
	    			"name": this.name,
	    			"theme": this.theme,
	    			"url": this.url,
	    			"songs": 0
	    		})
	    		this.name = ""
	    		this.theme = ""
	    		this.url = ""
	    	}
	    }
	    ,
	    updatePlaylist: function(key, newCount) {
	    	ref.child(key).update({"songs": newCount + 1})
	    }
	  }
	});
})

