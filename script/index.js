const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWords = (id) => {
  //   console.log("Clicked");
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLevelWords(json.data));
};

// "id": 4,
//       "level": 5,
//       "word": "Diligent",
//       "meaning": "পরিশ্রমী",
//       "pronunciation": "ডিলিজেন্ট"
const displayLevelWords = (data) => {
  //   console.log(data);
  const wordContainer = document.getElementById("word-containter");
  wordContainer.innerHTML = "";

  if (data.length == 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full py-5 md:py-12">
          <img class="mx-auto" src="./assets/alert-error.png" alt="" />
          <h1 class="text-[#79716B] text-[14px]">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </h1>
          <h1 class="font-semibold text-2xl">নেক্সট Lesson এ যান</h1>
        </div>`;
    return;
  }
  data.forEach((element) => {
    const wordContainerElement = document.createElement("div");
    wordContainerElement.innerHTML = `<div class="box-shadow p-3 bg-white rounded-lg"><h1 class="font-bold text-xl mb-2">${
      element.word
    }</h1>
        <h4 class="font-medium mb-3">Meaning /Pronounciation</h4>
        <h3 class="font-bangla font-semibold text-lg">"${
          element.meaning ? element.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      element.pronunciation
        ? element.pronunciation
        : "Pronounciation পাওয়া  যায়নি"
    }"</h3>
        <div class="flex justify-between items-center mt-10">
          <div class="bg-[#1a91ff1a] p-2 rounded-lg">
          <i class="fa-solid fa-circle-info "></i></div>
          <div class="bg-[#1a91ff1a] p-2 rounded-lg">
         <i class="fa-solid fa-volume-high"></i></div>
          
        </div></div>`;
    wordContainer.append(wordContainerElement);
  });
};
// "id": 101,
// "level_no": 1,
// "lessonName": "Basic Vocabulary"
const displayLessons = (lessons) => {
  //   console.log(data);
  const lessonLevel = document.getElementById("lesson-level");
  lessonLevel.innerHTML = "";

  for (let lesson of lessons) {
    // console.log(lesson);
    const lessonLevelBtn = document.createElement("div");
    lessonLevelBtn.innerHTML = `
          <a id="lesson-level-btn-${lesson.level_no}" onClick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary"
            ><i class="fa-solid fa-book-open"></i>Lessons-${lesson.level_no}</a
          >
       `;
    lessonLevel.append(lessonLevelBtn);
  }
};
loadLessons();
