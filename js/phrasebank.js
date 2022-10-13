// phrase bank ↓

var bank = [
  "Advice I gave to other people was really about me",
  "a/s/l?",
  "Don’t listen to the killers unless you fallin asleep while she’s callin a cab",
  "In case of emergency: Good Luck",
  "I’m always tired but never of you",
  "There is nothing behind you",
  "Assume all communications are tapped",
  "dark skin is not a crime",
  "warm comfort",
  "she waits, seething, blooming",
  "CRYING ROOM →",
  "Do not go gentle into that good night",
  "Please take your time. There is much to see.",
  "ugh",
  "Are you sure? Y/N",
  "open your mouth",
  "Is it now safe to turn off your computer",
  "For my next trick, I will be emotionally stable",
  "The last person I had to forgive was myself",
  "earth sucks",
  "SUPPORT WOMEN OF COLOUR",
  "I walked. And then. I saw me walking in front of myself. But it wasn’t really me.",
  "I thought my life would improve if I got a leather jacket. And I was totally right.",
  "PR__DA",
  "Just let it go",
  "If you’re horny, let’s do it",
  "I’m exhausted",
  "o.k.",
  "THE TRUTH IS OUT THERE",
  "I WANT TO BELIEVE",
  "The night is still young",
  "The one in front of the gun lives forever",
  "REAL RECOGNISE REAL",
  "Don’t give up. You've still got a couple of motherfuckers to prove wrong.",
  "Nice",
  "TRY AGAIN?",
  "all of their lies are true",
  "sometimes quiet is violent",
  "my parents warned me about the drugs in the streets but never the ones with hazel eyes and a heartbeat",
  "Eyes I dare not meet in dreams / In death's dream kingdom / Sunlight on a broken column",
  "Once upon a time somewhere along the temporal continuum...",
  "in the world through which i travel i am endlessly creating myself",
  "Britney survived 2007. You can survive today.",
  "Cool girl is hot. Cool girl is game. Cool girl is fun.",
  "Make art not friends",
  "In a time of deceit telling the truth is a revolutionary act.",
  "or perhaps we’ve forgotten that we are still pioneers",
  "Did you come into contact with unknown magical forces",
  "being nice is cool",
  "The lesson repeats, as needed.",
  "God exi   ts",
  "Sleep with your limbs dangling off the edge of your bed to let the monsters know you’re willing",
  "The smell of night, inhaling stars",
  "Everything you eat is sunlight made physical. You are radiant and forever",
  "Oh the things we invent when we are scared and want to be rescued",
  "I am sick to death of this particular self. I want another.",
  "“Do you love her to death?” “speak of her over my grave and watch how she brings me back to life.”",
  "If I love you: is that a fact or a weapon?",
  "Do the things you fear the most. Courage is an acquired taste; like caviar",
  "How you love yourself is how you teach others to love you",
  "This place could be beautiful, right? We could make this place beautiful.",
  "A monster is not such a terrible thing to be.",
  "That’s the horror of speaking, of writing. There is nowhere to hide.",
  "The Dark—felt beautiful—",
  "come celebrate with me that every day something has tried to kill me and has failed",
  "This is not a love story, but love is in it. That is, love is just outside it, looking for a way to break in",
  "I have taken the god into my mouth, chewed it up and tried not to choke on the bones",
  "I am tired of waiting for the world to become good and kind"
];

// Do stuff on load ↓

document.body.onload = setFont();
document.body.onload = getPhrase(bank);

// Functions ↓

function getPhrase(bank) {
  var phrase = bank[Math.floor(Math.random()*bank.length)];

  var textwrap = document.getElementById("textwrap");

  ["r", "g", "b", "w", "w-l", "w-r"].map(
    function (color) {
      var e = document.createElement("div");
      e.className = "tvtext " + color;
      e.textContent = phrase;
      textwrap.appendChild(e);
    }
  );

};

function setFont(){
  var fonts = [
    "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'Roboto', 'Ubuntu', 'Segoe UI', 'Fira Sans', 'Droid Sans', Arial, sans-serif",
    "'Athelas', 'Georgia Pro' Georgia, serif",
    "'Hoefler Text', serif",
    "'Garamond EB', Garamond, serif",
    "'Goudy Old Style', 'Didot', serif",
    "'Franklin Gothic', 'Franklin Gothic FS','SF Compact Display', sans-serif",
    "'SF Compact Display', 'SF Pro Display', sans-serif",
    "'Tahoma Regular', Tahoma, sans-serif"
  ];
  var font = fonts[Math.floor(Math.random()*fonts.length)];
  document.body.style.cssText = "font-family: " + font;
};

function swapPhrase(bank) {
  var phrase = bank[Math.floor(Math.random()*bank.length)];
  var elements = document.getElementsByClassName("tvtext");
  Array.prototype.forEach.call(elements, function(e) {
      e.textContent = phrase;
  });
  setFont();
}
