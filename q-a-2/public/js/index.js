"use strict";


let stepsCandidates = {
  "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [],
}
/*
candidates.forEach(candidate => {
  let step = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(1)) + Math.ceil(1));
  stepsCandidates[step].push(candidate);
})*/
stepsCandidates["1"] = [...candidates];
//stepsCandidates["5"] = candidates.slice(0, 5);
//stepsCandidates["6"] = candidates.slice(0, 5);
//stepsCandidates["7"] = [];
//stepsCandidates['8'].push(candidates[0]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepPages: [
        <StartingPage nextStep={() => this.nextStep()} />,
        <Step1Page data={data} nextStep={() => this.nextStep()} />,
        <Step2Page data={data} nextStep={() => this.nextStep()} />,
        <Step3Page data={data} nextStep={() => this.nextStep()} />,
        <Step4Page data={data} nextStep={() => this.nextStep()} />,
        <Step5Page data={data} nextStep={() => this.nextStep()} />,
        <Step6Page data={data} nextStep={() => this.nextStep()} />,
        <Step7Page data={data} nextStep={() => this.nextStep()} />,
        <Step8Page data={data} nextStep={() => this.nextStep()} />,
        <EndingPage nextStep={() => this.resetStep()} />
      ],
      step: 0
    }
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 });
  }

  resetStep() {
    stepsCandidates = {
      "1": [...candidates], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [],
    }
    this.setState({ step: 0 });
  }

  render() {
    return this.state.stepPages[this.state.step];
  }
}

function randomizeCandidates() {
  let candidatesTemp = [...candidates];
  let randomId;

  let candidateTemp = getRandomCandidate(candidatesTemp);
  candidateTemp.stepOneGame.age = "17 ans";
  candidateTemp.stepOneGame.valid = false;

  candidateTemp = getRandomCandidate(candidatesTemp);
  candidateTemp.stepOneGame.legalStatus = "Perte des droits d'éligibilité";
  candidateTemp.stepOneGame.valid = false;

  candidateTemp = getRandomCandidate(candidatesTemp);
  candidateTemp.stepTwoGame.valid = false;

  candidateTemp = getRandomCandidate(candidatesTemp);
  randomId = Math.floor(Math.random()*4);
  Object.values(candidateTemp.stepThreeGame.statements)[randomId].statement = "Ordinateur portable";
  Object.values(candidateTemp.stepThreeGame.statements)[randomId].valid = false;

  candidateTemp = getRandomCandidate(candidatesTemp);
  randomId = Math.floor(Math.random()*4);
  Object.values(candidateTemp.stepThreeGame.statements)[randomId].statement = "Maison de ses parents";
  Object.values(candidateTemp.stepThreeGame.statements)[randomId].valid = false;
}

function getRandomCandidate(candidatesTemp) {
  const randomIndex = Math.floor(Math.random()*candidatesTemp.length);
  const candidateTemp = candidatesTemp[randomIndex];
  candidatesTemp.splice(randomIndex, 1);
  return candidateTemp;
}

randomizeCandidates();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Wait for the video to preload and display 1st slide
const video = videojs(document.querySelector('#background-video'));
video.one('loadeddata', (event) => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide1();
  // Debug trace because the loadeddata event is
  // sometime not fired
  console.log("Video loaded");
etime not fired
  console.log("Video loaded");
.log("Video loaded");
});*/