define([
  'player',
  'song',
  'jquery',
],
function (Player, Song, $) {
  var song = new Song();
  var player = new Player();

  player.play(song);

  $('.main').html('Is playing: ' + player.isPlaying);
});
