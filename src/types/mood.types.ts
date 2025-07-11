export type MoodType = {
  id: string;
  label: string;
  icon: string;
};

export type MoodSet = {
  name: string;
  moods: MoodType[];
};

export const moodSets: MoodSet[] = [
  {
    name: "Shiba Inu",
    moods: [
      { id: "peace", label: "Peace", icon: "/src/assets/moods/shiba-mood/peace.png" },
      { id: "love", label: "Love", icon: "/src/assets/moods/shiba-mood/love.png" },
      { id: "cool", label: "Cool", icon: "/src/assets/moods/shiba-mood/cool.png" },
      { id: "cry", label: "Cry", icon: "/src/assets/moods/shiba-mood/cry.png" },
      { id: "laughing", label: "Laughing", icon: "/src/assets/moods/shiba-mood/laughing.png" },
      { id: "rolling-eyes", label: "Rolling eyes", icon: "/src/assets/moods/shiba-mood/rolling-eyes.png" },
    ],
  },
  {
    name: "Cat",
    moods: [
      { id: "peace", label: "Peace", icon: "/src/assets/moods/cat-mood/peace.png" },
      { id: "love", label: "Love", icon: "/src/assets/moods/cat-mood/love.png" },
      { id: "cool", label: "Cool", icon: "/src/assets/moods/cat-mood/cool.png" },
      { id: "cry", label: "Cry", icon: "/src/assets/moods/cat-mood/cry.png" },
      { id: "laughing", label: "Laughing", icon: "/src/assets/moods/cat-mood/laughing.png" },
      { id: "rolling-eyes", label: "Rolling eyes", icon: "/src/assets/moods/cat-mood/rolling-eyes.png" },
    ],
  },
  {
    name: "Koala",
    moods: [
      { id: "peace", label: "Peace", icon: "/src/assets/moods/koala-mood/peace.png" },
      { id: "love", label: "Love", icon: "/src/assets/moods/koala-mood/love.png" },
      { id: "cool", label: "Cool", icon: "/src/assets/moods/koala-mood/cool.png" },
      { id: "cry", label: "Cry", icon: "/src/assets/moods/koala-mood/cry.png" },
      { id: "laughing", label: "Laughing", icon: "/src/assets/moods/koala-mood/laughing.png" },
      { id: "rolling-eyes", label: "Rolling eyes", icon: "/src/assets/moods/koala-mood/rolling-eyes.png" },
    ],
  },
  {
    name: "Emoji",
    moods: [
      { id: "peace", label: "Peace", icon: "/src/assets/moods/emoji-mood/peace.png" },
      { id: "love", label: "Love", icon: "/src/assets/moods/emoji-mood/love.png" },
      { id: "cool", label: "Cool", icon: "/src/assets/moods/emoji-mood/cool.png" },
      { id: "cry", label: "Cry", icon: "/src/assets/moods/emoji-mood/cry.png" },
      { id: "laughing", label: "Laughing", icon: "/src/assets/moods/emoji-mood/laughing.png" },
      { id: "rolling-eyes", label: "Rolling eyes", icon: "/src/assets/moods/emoji-mood/rolling-eyes.png" },
    ],
  },
];



// <a href="https://www.flaticon.com/free-icons/scared" title="scared icons">Scared icons created by André Luiz Gollo - Flaticon</a>
// for emoji attributions so i can find them later 

// <a href="https://www.flaticon.com/free-icons/shiba-inu" title="shiba inu icons">Shiba inu icons created by AomAm - Flaticon</a> 
// for coala, dog and cat emojis
