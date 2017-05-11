// Welcome, glad to see you there. Feel free to ask anything at the workshop.//
//web app
var locale = "ru_RU";
var time = 120;

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    // set region

    if (properties.region) {
      //alert(properties.region.value);
      locale = properties.region.value;
      //alert(locale);
      getChampion(locale);
    };
    //set time
    if (properties.time) {
      time = properties.time.value;
      //alert(time);
      //start(time);
    };
  }
};


//random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//main function
function getChampion(locale) {
  var json_link = "https://ddragon.leagueoflegends.com/cdn/6.24.1/data/$loc$/champion.json";
  //link locale
  json_link = json_link.replace("$loc$", locale);

  $.getJSON(json_link, function (json) {
    var error = false;
    var keys_n = Object.keys(json.data).length;
    var i = getRandomInt(0, keys_n);
    var champ = Object.keys(json.data)[i];
    var item = json.data[champ];
    if (champ == "Jarvaniv") champ = "JarvanIV"
    if (champ == "Tahmkench") champ = "TahmKench"
    var rand_skin = getRandomInt(0, 7);
    var link = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg";
    //link champ
    link = link.replace(/h\/.*_/, "h/" + champ + "_");
    //link
    link = link.replace(/_\d./, "_" + rand_skin + ".");
    var img = document.getElementById('main_img');
    img.style.height = window.screen.height;
    var width_c;
    var image = document.createElement('img');
    image.src = link;
    image.onerror = function () {
      error = true;
      getChampion(locale);
    };
    //alert(image.style.width);

    if (!error) {
      $(img).fadeOut(300, function () {
        img.src = link;
        $(img).delay(300).fadeIn(300);
      });
      //name
      $('.name').html(champ);
      //status
      $('.title').html(item.title+'<i class="material-icons right" onclick="getChampion(locale);">keyboard_arrow_right</i></span>');
      //desc
      var info = "<br>" +
        "Difficulty: " + item.info["difficulty"] +
        "  Attack: " + item.info["attack"] +
        "  Defense: " + item.info["defense"] +
        "  Magic: " + item.info["magic"];

      $('.blurb').html(item.tags + "<br>" + item.blurb + info);
      error = false;
    } else {
      getChampion(locale);
    }
  });
}

getChampion(locale);
var timerId = setInterval(function () {
  getChampion(locale);


}, time * 1000);