const jsonUrl =
	"https://raw.githubusercontent.com/tokyodebate/motions/main/Javascript/TournamentList.json";
const tagValue = {
	NA: "NA",
	BP: "BP",
	Asian: "AP",
	Australasian: "Austral",
	rookie: "Rookie",
	open: "Open",
	proam: "Pro-am",
	schools: "Schools",
	"region:Domestic": "Domestic",
	international: "",
	"region:World": "Worldwide",
	"region:Asia": "Asia",
	"region:Oceania": "Oceania",
	"region:Europe": "Europe",
	"region:America": "America",
};
var tournamentInfo;

fetch(jsonUrl)
	.then((response) => response.json())
	.then((j) => {
		tournamentInfo = j;
		hashResponse();
		window.addEventListener("hashchange", hashResponse);
	});

//Search button
$("#search-tournaments").click(() => {
	nameInput = $("#nameInput").val();
	formatInput = $("#div-format :checked")
		.map(function () {
			return $(this).val();
		})
		.toArray();
	typeInput = $("#div-type :checked")
		.map(function () {
			return $(this).val();
		})
		.toArray();
	regionInput = $("#div-region :checked")
		.map(function () {
			return $(this).val();
		})
		.toArray();
	yearInput = $("#yearInput").val();
	hashArray = [];
	if (nameInput != "") {
		hashArray.push(`name=${nameInput}`);
	}
	if (formatInput.length !== 0) {
		hashArray.push(`format=${formatInput.join("+")}`);
	}
	if (typeInput.length !== 0) {
		hashArray.push(`eligibility=${typeInput.join("+")}`);
	}
	if (regionInput.length !== 0) {
		hashArray.push(`region=${regionInput.join("+")}`);
	}
	if (yearInput != "") {
		hashArray.push(`year=${yearInput}`);
	}
	window.location.hash = "#" + hashArray.join("&");
});

//Reset button
$("#reset").click(() => {
	window.location.hash = "";
});

//Response to hash change
function hashResponse() {
	let currentHash = new URL(document.URL).hash;
	//Show tournament
	if (currentHash.includes("tournament=")) {
		$("section#display-tournament").show();
		$("section#display-search").hide();
		const tournamentMatch = currentHash.match(/(?<=tournament\=).*/);
		fetchTournament(tournamentMatch[0]);
	}
	//Show search
	else {
		$("section#display-tournament").hide();
		$("section#display-search").show();
		const nameMatch = currentHash.match(/(?<=name\=)[^&]*/);
		const formatMatch = currentHash.match(/(?<=format\=)[^&]*/);
		const eligibilityMatch = currentHash.match(/(?<=eligibility\=)[^&]*/);
		const regionMatch = currentHash.match(/(?<=region\=)[^&]*/);
		const yearMatch = currentHash.match(/(?<=year\=)[^&]*/);
		searchTournament(
			nameMatch === null ? undefined : nameMatch[0],
			formatMatch === null ? undefined : formatMatch[0].split("+"),
			eligibilityMatch === null ? undefined : eligibilityMatch[0].split("+"),
			regionMatch === null ? undefined : regionMatch[0].split("+"),
			yearMatch === null ? undefined : parseInt(yearMatch[0])
		);
	}
}

function fetchTournament(tournamentToSearch) {
	$("section#display-tournament").empty();
	foundTournament = tournamentInfo.find((e) => e.id === tournamentToSearch);
	if (foundTournament === undefined) {
		$(`<p class="h2">Tournament not found</p>`).appendTo(
			"section#display-tournament"
		);
		return;
	} else {
		loadMotions(
			"https://raw.githubusercontent.com/tokyodebate/motions/main/" +
				foundTournament.url
		);
	}
}

function searchTournament(name, format, eligibility, region, year) {
	let searchResults = tournamentInfo.filter((e) => {
		if (
			name !== undefined
				? !e.name.toLowerCase().includes(name.toLowerCase()) &&
				  !e.short.toLowerCase().includes(name.toLowerCase())
				: false
		) {
			return false;
		}
		if (
			format !== undefined ? format.every((f) => !e.tag.includes(f)) : false
		) {
			return false;
		}
		if (
			eligibility !== undefined
				? eligibility.every((f) => !e.tag.includes(f))
				: false
		) {
			return false;
		}
		if (
			region !== undefined
				? region.every((f) => !e.tag.includes("region:" + f))
				: false
		) {
			return false;
		}
		if (year !== undefined ? e.latest < year : false) {
			return false;
		}
		return true;
	});
	searchResults.sort((a, b) =>
		a.name.toUpperCase().localeCompare(b.name.toUpperCase())
	);
	$("section#display-search").empty();
	for (const found of searchResults) {
		const divTag = $(
			`<div class="gap-1 d-flex align-items-baseline"></div>`
		).appendTo(
			$(`<div class="py-4 list-group-item"></div>`)
				.appendTo("section#display-search")
				.append(
					`<div class="mb-2"><a class="link-danger link-underline-opacity-0 h5" href="#tournament=${
						found.id
					}">${found.name}${
						found.short == "" ? "" : " (" + found.short + ")"
					}</a><span class="badge bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded-pill ms-3">~${
						found.latest
					}</span></div>`
				)
		);
		found.tag.forEach((tg) => {
			divTag.append(
				`<span class="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill">${tagValue[tg]}</span>`
			);
		});
	}
}

function loadMotions(url) {
	var results = Papa.parse(url, {
		download: true,
		delimiter: "\t",
		quoteChar: "",
		escapeChar: "",
		header: false,
		skipEmptyLines: "greedy",
		complete: function (results) {
			showMotions(results.data);
		},
	});
}

function len(data) {
	return data ? data.length : 0;
}

function showMotions(array) {
	myRoundLabel = $("<p></p>");
	myMotionsList = [];
	myTournamentName = "";
	myArticle = $("<article></article>").appendTo("section#display-tournament");
	myArticle.append(`<p class="h2">Motions for ${array[0][0]}</p>`);
	for (var line = 0; line < array.length; line++) {
		switch (len(array[line])) {
			case 2: //Tournament
				myTournamentName = array[line][1];
				myTournament = $("<div class='card-body'></div>")
					.appendTo($("<div class='card mb-3'></div>").appendTo(myArticle))
					.append(`<h3 class="card-title px-3">${myTournamentName}</h3>`);
				break;
			case 3: //Round
				if (myRoundLabel) {
					//前のラウンドのCopy Buttonを生成する
					createCopyButton(myMotionsList, myRoundLabel);
				}
				myRound = $("<div class='card-body'></div>").appendTo(myTournament);
				//Copyボタンように[[motion, info], [motion, info], ...]を保存するリスト
				myMotionsList = [];
				//後にCopyボタンを追加する対象。css flexboxを利用
				myRoundLabel = $(
					`<div class='card-header border-bottom border-danger d-flex justify-content-between align-items-center'>${array[line][2]}</div>`
				).appendTo(myRound);

				break;
			case 4: //Motion
				myMotion = $(
					"<div style='display: flex; flex-direction: column'></div>"
				)
					.appendTo(myRound)
					.append(`<h3 class="card-title px-3 pt-4">${array[line][3]}</h3>`);
				myMotionsList.push([array[line][3], ""]);
				break;
			case 5: //Info
				if (!array[line][4].includes("$stats")) {
					myMotion.append(
						$(`<p class="card-text mx-3 px-3">${array[line][4]}</p>`)
					);
					myMotionsList[myMotionsList.length - 1][1] += array[line][4] + "\n";
				} else {
					//Motion statsの場合、.txtファイルにxx $stats a, b, ...の形式で書かれている
					showStats(array[line][4], myMotion);
				}
			default:
		}
	}
	//次のroundに差し掛かった際にcopy buttonを生成する都合上、最後のラウンドのみ手動で生成する
	createCopyButton(myMotionsList, myRoundLabel);
}

//motion statisticsのバーを表示する
function showStats(text, motion) {
	textSplit = text.split(/ ?\$stats ?/);
	stats = textSplit[1].split(/[ |,]+/);
	myBar = $(`<div class="card-subtitle stats-row px-3 pt-4"></div>`)
		.append(`<div class="stats-label">${textSplit[0]}</div>`)
		.appendTo(motion);
	switch (stats.length) {
		case 2: //○○ $stats (govの勝ち数), (oppの勝ち数)はNA
			myBar.append(
				$(
					`<div class="stats-container" style="grid-template-columns: ${stats[0]}fr ${stats[1]}fr;">
						<div class="stats-bar stats-blue">${stats[0]}</div>
						<div class="stats-bar stats-red">${stats[1]}</div>
					</div>`
				)
			);
			break;
		case 3: //○○ $stats (gov), (opp), (全体)はAsian
			myBar.append(
				$(
					`<div class="stats-container" style="grid-template-columns: ${
						stats[0]
					}fr ${stats[1]}fr ${stats[2] - stats[0] - stats[1]}fr;">
						<div class="stats-bar stats-blue">${stats[0]}</div>
						<div class="stats-bar stats-red">${stats[1]}</div>
						<div class="stats-bar stats-gray">${stats[2] - stats[0] - stats[1]}</div>
					</div>`
				)
			);
			break;
		case 4: //○○ $stats (1位), (2位), (3位), (4位)はBP
			myBar.append(
				$(
					`<div class="stats-container" style="grid-template-columns: ${stats[0]}fr ${stats[1]}fr ${stats[2]}fr ${stats[3]}fr;">
						<div class="stats-bar stats-blue">${stats[0]}</div>
						<div class="stats-bar stats-blue-light">${stats[1]}</div>
						<div class="stats-bar stats-red-light">${stats[2]}</div>
						<div class="stats-bar stats-red">${stats[3]}</div>
					</div>`
				)
			);
			break;
		default:
	}
}

//Copy buttonを作る
function createCopyButton(myMotionsList, myRoundLabel) {
	//[motion, info]の組のリストでであるmyMotionsListをコピーするテキストに変換
	var myMotionText = "";
	var myInfoText = "";
	if (myMotionsList.length === 1) {
		//NA or BP
		myMotionText = `\n\n**Motion**: ${myMotionsList[0][0]}`;
		if (myMotionsList[0][1] != "") {
			myInfoText = `**\n\nInfo**: ${myMotionsList[0][1]}`;
		}
	} else if (myMotionsList.length <= 3 && myMotionsList.length >= 1) {
		//AsianはMotion/info Aなどと表記
		console.log(myMotionsList);
		for (var i = 0; i < 3; i++) {
			myMotionText += `\n\n**Motion ${["A", "B", "C"][i]}**: ${
				myMotionsList[i][0]
			}`;
			if (myMotionsList[i][1] != "") {
				myInfoText += `\n\n**Info ${["A", "B", "C"][i]}**: ${
					myMotionsList[i][1]
				}`;
			}
		}
	}
	myMotionText += `\n\n(${
		myRoundLabel.text().split(":")[0]
	}, ${myTournamentName}`;
	//Create div for buttons
	myButtons = $("<div class='d-inline'></div>").appendTo(myRoundLabel);
	//Info
	if (myInfoText != "") {
		$("<button class='btn btn-outline-secondary'>Copy Info</button>")
			.appendTo(myButtons)
			.on("click", function () {
				navigator.clipboard.writeText(myInfoText.slice(2));
			});
	}
	$("<button class='btn btn-outline-secondary'>Copy Motion</button>")
		.appendTo(myButtons)
		.on("click", function () {
			navigator.clipboard.writeText(myMotionText.slice(2));
		});
}
