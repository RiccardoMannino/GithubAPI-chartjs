const getRepo = async () => {
  const form = document
    .querySelector(".form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const listaCommit = [];
      const listaIssue = [];

      const username = document.querySelector(".testo").value;
      const userUrl = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(userUrl);
      const data = await response.json();

      let nomeRepo = await data.map((repo) => repo.name);
      let full = await data.map((repo) => repo.full_name);
      console.log(nomeRepo);

      const github = document.querySelector(".github");
      github.href = `https://github.com/${username}`;
      github.setAttribute("target", "_blank");

      data.forEach(async (repos) => {
        let commitUrl = await fetch(
          `https://api.github.com/repos/${repos.full_name}/commits`
        );
        let commitResponse = await commitUrl.json();
        listaCommit.push(commitResponse.length);
        myChart.update();
      });

      data.forEach(async (repos) => {
        let issueUrl = await fetch(
          `https://api.github.com/repos/${repos.full_name}/issues`
        );
        let issueResponse = await issueUrl.json();
        listaIssue.push(issueResponse.length);
      });

      const dati = {
        labels: nomeRepo,
        datasets: [
          {
            label: "Commit",
            data: listaCommit,
            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
          {
            label: "Issues",
            data: listaIssue,
            backgroundColor: ["rgb(153, 102, 255)"],
            borderColor: ["rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
        ],
      };

      let config = {
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
              text: "Numero di commit per repository",
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

      let myChart = new Chart(
        document.getElementById("myChart").getContext("2d"),
        config
      );
    });
};

getRepo();
