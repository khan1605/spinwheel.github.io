const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "10% OFF" },
  { minDegree: 31, maxDegree: 60, value: "20% OFF" },
  { minDegree: 0, maxDegree: 30, value: "30% OFF" },
  { minDegree: 331, maxDegree: 360, value: "40% OFF" },
  { minDegree: 301, maxDegree: 330, value: "Try Again" },
  { minDegree: 271, maxDegree: 300, value: "Rs 500 Coupon" },
  { minDegree: 241, maxDegree: 270, value: "RS 100 Coupon" },
  { minDegree: 211, maxDegree: 240, value: "25% OFF" },
  { minDegree: 181, maxDegree: 210, value: "60% OFF" },
  { minDegree: 151, maxDegree: 180, value: "Rs 1000 Coupon" },
  { minDegree: 121, maxDegree: 150, value: "Spin Again" },
  { minDegree: 91, maxDegree: 120, value: "5% OFF" },
];

const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];

let firstSpin = true; // Flag to track the first spin

let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, "Try Again", 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if (i.value === "Try Again" && firstSpin) {
        text.innerHTML = "<p>Oops! Try Again</p>";
      } else {
        text.innerHTML = `<p>Congratulations, You Have Won ${i.value}!</p>`;
      }
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = "<p>Best Of Luck!</p>";
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    }
    if (firstSpin && spinChart.options.rotation >= 301 && spinChart.options.rotation <= 330 && count > 15) {
      generateValue(spinChart.options.rotation);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      firstSpin = false; // Set firstSpin flag to false after the first spin
    } else if (!firstSpin && count > 15 && spinChart.options.rotation === randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
