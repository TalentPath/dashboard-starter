//http://ergast.com/mrd/

class F1Graph {
    graphPane = document.querySelector('.f1results');
    url = 'https://ergast.com/api/f1/current/driverStandings.json';
    constructor() {

    }

    getFetch() {
        return fetch(this.url);
    }

    render() {
        document.addEventListener('DOMContentLoaded', () => {

            document.getElementById("f1yearbtn").addEventListener("click", async ev => {
                ev.preventDefault();
                let searchValue = document.getElementById("f1year").value;
                this.url = `https://ergast.com/api/f1/${searchValue}/driverStandings.json`
                console.log(this.url);
                let graphContent = '';

                let resp = await this.getFetch();
                let data = await resp.json();
                console.log(data)


                var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
                var yValues = [55, 49, 44, 24, 15];
                var barColors = ["red", "green", "blue", "orange", "brown"];

                let fname = '';
                let nameList = [];
                let teamList = [];
                let winList = [];
                let pointsList = [];

                for (let i = 0; i < 5; i++) {
                    fname = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;
                    nameList.push(fname.concat(" ", data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName)); teamList.push(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name);
                    pointsList.push(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points);
                    winList.push(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins);
                }

                console.log(teamList, pointsList, winList, nameList)

                new Chart("myChart", {
                    type: "horizontalBar",
                    data: {
                        labels: nameList,
                        datasets: [{
                            backgroundColor: barColors,
                            data: pointsList,
                            base: 0
                        }]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: `${searchValue} F1 Season Standings`
                        }
                    }
                });
            })
        })
    }
}

export default F1Graph;