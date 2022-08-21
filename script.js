const form = document
  .querySelector(".form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let username = document.querySelector("#Ricerca").value;

    const userUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(userUrl);
    const data = await response.json();

    let nomeRepo = await data.map((repo) => repo.name);

    // SVG con link della repository dell'utente ricercato

    const github = document.querySelector(".github");
    github.href = `https://github.com/${username}`;
    github.setAttribute("target", "_blank");

    //  Lista commit ed issue
    const listaCommit = [];
    const listaIssue = [];

    data.forEach(async (repos) => {
      let commitUrl = await fetch(
        `https://api.github.com/repos/${repos.full_name}/commits`
      );
      let commitResponse = await commitUrl.json();
      listaCommit.push(commitResponse.length);

      let issueUrl = await fetch(
        `https://api.github.com/repos/${repos.full_name}/issues`
      );
      let issueResponse = await issueUrl.json();
      listaIssue.push(issueResponse.length);

      myChart.update();
    });

    dati.labels = nomeRepo;
    dati.datasets[0].data = listaCommit;
    dati.datasets[1].data = listaIssue;
  });

const dati = {
  labels: [],
  datasets: [
    {
      label: "Commit",
      data: [],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
    {
      label: "Issues",
      data: [],
      backgroundColor: ["rgb(153, 102, 255)"],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "bar",
  data: dati,
  options: {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Numero di commit ed issue per repository (Max 30)",
        font: {
          size: 16,
          family: "tahoma",
          weight: "normal",
          style: "italic",
        },
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        beginAtZero: true,
      },
    },
  },
};
const myChart = new Chart(
  document.getElementById("myChart").getContext("2d"),
  config
);
