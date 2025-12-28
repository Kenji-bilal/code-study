/* ===============================
   State variables
================================ */
let currentLang = null;   // 'c' | 'py'
let currentLevel = null;  // 'easy' | 'medium' | 'hard'
let currentStep = "lang"; // 'lang' | 'level' | 'question'

/* ===============================
   Questions database
================================ */
const questions = {
  c: {
    easy: {
      q: "اكتب برنامج C يطبع Hello World",
      a:
`#include <stdio.h>

int main() {
  printf("Hello World");
  return 0;
}`
    },
    medium: {
      q: "اكتب برنامج C يحسب مجموع عددين",
      a:
`#include <stdio.h>

int main() {
  int a, b;
  scanf("%d %d", &a, &b);
  printf("%d", a + b);
  return 0;
}`
    },
    hard: {
      q: "تحقق هل العدد أولي",
      a:
`#include <stdio.h>

int main() {
  int n, i, prime = 1;
  scanf("%d", &n);

  if (n <= 1)
    prime = 0;

  for (i = 2; i <= n / 2; i++) {
    if (n % i == 0) {
      prime = 0;
      break;
    }
  }

  if (prime)
    printf("Prime");
  else
    printf("Not Prime");

  return 0;
}`
    }
  },

  py: {
    easy: {
      q: "اكتب برنامج Python يطبع Hello World",
      a:
`print("Hello World")`
    },
    medium: {
      q: "احسب مجموع عددين في Python",
      a:
`a = int(input())
b = int(input())
print(a + b)`
    },
    hard: {
      q: "تحقق هل العدد أولي في Python",
      a:
`n = int(input())
prime = True

if n <= 1:
    prime = False

for i in range(2, n):
    if n % i == 0:
        prime = False
        break

print("Prime" if prime else "Not Prime")`
    }
  }
};

/* ===============================
   Render logic
================================ */
function render() {
  hideAll();

  // Show current step
  if (currentStep === "lang") {
    show("step-lang");
  }

  if (currentStep === "level") {
    show("step-level");
  }

  if (currentStep === "question") {
    show("step-question");
    document.getElementById("question-text").textContent =
      questions[currentLang][currentLevel].q;
  }
}

/* ===============================
   Helpers
================================ */
function hideAll() {
  ["step-lang", "step-level", "step-question", "solution"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
}

function show(id) {
  document.getElementById(id).classList.remove("hidden");
}

/* ===============================
   User actions
================================ */
function selectLang(lang) {
  currentLang = lang;
  currentStep = "level";
  render();
}

function selectLevel(level) {
  currentLevel = level;
  currentStep = "question";
  render();
}

function showSolution() {
  const sol = document.getElementById("solution");
  sol.textContent = questions[currentLang][currentLevel].a;
  sol.classList.remove("hidden");
}

function goTo(step) {
  currentStep = step;
  render();
}

/* ===============================
   Reset when opening "Codes"
================================ */
function resetCode() {
  currentLang = null;
  currentLevel = null;
  currentStep = "lang";
  render();
}

/* ===============================
   Init
================================ */
render();
