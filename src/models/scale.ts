type answer = {
    description: string
    value: number
}

type range = {
    min: number
    max: number
}

type question = {
    id: number
    title: string
    range: range
    possibleAnswer: {
        minimal: answer
        intermediate: answer
        highDepending: answer
    }
    chosenValue: 1 | 2 | 3
}

type classificationType = {
    range: range
    description: string
}

type classification = {
    minimal: classificationType
    intermediate: classificationType
    highDepending: classificationType
}

interface scale {
    id: number
    name: string
    range: number[]
    questions: question[]
    classification: classification
    result: classification
    sum: number
    getQuestions(): question[]
    getSum(): number
    getResult(): classificationType
}

export class Scale implements scale {

    constructor(
        public id: number,
        public name: string,
        public range: number[],
        public questions: question[],
        public classification: classification, // Added missing classification
        public result: classification,
        public sum: number,
    ) { }

    getQuestions(): question[] {
        return [...this.questions]; // Return a copy to prevent modification
    }

    getSum(): number {
        this.sum = this.questions.reduce((acc, question) => acc + question.chosenValue, 0);
        return this.sum;
    }

    getResult(): classificationType {
        try {
            if (this.sum < this.classification.minimal.range.min) {
                return this.classification.minimal;
            }
            if (this.sum < this.classification.intermediate.range.min) {
                return this.classification.intermediate;
            }
            return this.classification.highDepending;
        } catch (error) {
            throw new Error('Error getting result');
        }
    }
}
