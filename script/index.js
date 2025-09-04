const createElement = (arr) => {
  const elementHtml = arr.map(
    (el) => `<span class="btn btn-soft">${el}</span>`
  );
  return elementHtml.join(" ");
};

const spinnerManage = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-containter").classList.add("hidden");
  } else {
    document.getElementById("word-containter").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => {
      displayLessons(json.data);
    });
};
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn-level");
  // console.log(lessonBtn);
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWords = (id) => {
  //   console.log("Clicked");
  spinnerManage(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const clickBtn = document.getElementById(`lesson-level-btn-${id}`);
      removeActive();
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWords(json.data);
    });
};

const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayWordDetails(json.data));
};
//  "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//       "enthusiastic",
//       "excited",
//       "keen"
//     ],
//     "id": 5
const displayWordDetails = (data) => {
  // console.log(data);
  const myModal = document.getElementById("details_container");
  myModal.innerHTML = `<h3 class="text-2xl font-bold">
          ${data.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    data.pronunciation
  })
        </h3>
        <p class="pt-2 font-semibold text-lg">Meaning</p>
        <p class="font-bangla">${data.meaning}</p>
        <p class="pt-2 font-semibold text-lg">Example</p>

        <p class="">${data.sentence}</p>
        <p class="pt-2 font-semibold text-lg font-bangla">সমার্থক শব্দ গুলো</p>
        <div>${createElement(data.synonyms)}</div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>`;
  document.getElementById("my_modal_5").showModal();
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
    spinnerManage(false);
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
          <div onclick="loadWordDetail(${
            element.id
          })" class="bg-[#1a91ff1a] p-2 rounded-lg">
          <i class="fa-solid fa-circle-info "></i></div>
          <div class="bg-[#1a91ff1a] p-2 rounded-lg">
         <i class="fa-solid fa-volume-high"></i></div>
          
        </div></div>`;
    wordContainer.append(wordContainerElement);
  });
  spinnerManage(false);
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
          <button id="lesson-level-btn-${lesson.level_no}" onClick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn-level"
            ><i class="fa-solid fa-book-open"></i>Lessons-${lesson.level_no}</button
          >
       `;
    lessonLevel.append(lessonLevelBtn);
  }
};
loadLessons();
