class Step5Page extends Page {
    constructor(props) {
        super(props);
        const step = 5;
        const data = props.data.steps['5'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="Débats et temps de parole"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Continuer"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                    nextStepMessage="Passer à l'indication suivante :"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextStep()}
                    buttonText="Vérifier"
                    questionTitle={data.title}
                    question={questions[1].question}
                    answer={questions[1].answer}
                    learnMoreLink={questions[1].link}
                    nextStepMessage="Vérifier le temps de parole de chaque candidat"
                />,
            ],
            subStepIndex: 0
        }
    }
}