define([
  'src/player',
  'src/song'
],
function (Player, Song) {
  var song = new Song();
  var player = new Player();

  player.play(song);

  var element = document.querySelector(".main");
  element.innerHTML = 'Is playing: ' + player.isPlaying;
});
