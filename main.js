Polymer('j0n-dashboard-gallery', {
  count: 50,
  currentImage: 0,
  photos: [],
  ready: function() {
    this.$.photos.model = this.photos;
    this.$.ajax.addEventListener("polymer-response", 
        function(e) {
          this.photos = {photos: e.detail.response.data}
          this.$.photos.model = {photos: e.detail.response.data}
          setTimeout(this.nextImage.bind(this), 300);
        }.bind(this)
      );
  },
  nextImage: function() {
    console.log(this.offsetWidth);
    console.log(this.offsetHeight);
   if (this.currentImage > 0) {
     var b = this.shadowRoot.querySelectorAll('.insta-holder')[this.currentImage-1];
     var s = b.style;
     s.webkitTransform = s.mozTransform = s.msTransform = s.transform = 'scale(1) translate(0px, 0px)';
   }
   var offset = {
     top: this.shadowRoot.querySelectorAll('.insta-holder')[this.currentImage].offsetTop,
     left: this.shadowRoot.querySelectorAll('.insta-holder')[this.currentImage].offsetLeft
   }
   var c = this.shadowRoot.querySelectorAll('.insta-holder')[this.currentImage];
   var scale = 3;
   var elMiddle = (c.offsetWidth)/2;
   var middle = this.offsetWidth/2;
   var target = middle-elMiddle;
   var left = (target-(offset.left))/scale;
   var s = c.style;
    s.webkitTransform = s.mozTransform = s.msTransform = s.transform = 'scale('+scale+') translate('+left+'px, 0px)';
    this.currentImage++;
    if (this.currentImage > (this.photos.photos.length-1)) {
      this.currentImage = 0;
    }
    setTimeout(this.nextImage.bind(this), 5000);
  }
});
