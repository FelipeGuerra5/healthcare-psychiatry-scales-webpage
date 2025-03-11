type answer = {
    level: string
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
    possibleAnswer: answer[]
    chosenValue: number
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

export interface scale {
    id: number
    name: string
    description: string
    range: range
    questions: question[]
    classification: classification
    result: classification
    sum: number
    // getQuestions(): question[]
    // getSum(): number
    // getResult(): classificationType
}

// export class Scale implements scale {

//     constructor(
//         public id: number,
//         public name: string,
//         public description: string,
//         public range: range,
//         public questions: question[],
//         public classification: classification, // Added missing classification
//         public result: classification,
//         public sum: number,
//     ) { }

//     getQuestions(): question[] {
//         return [...this.questions]; // Return a copy to prevent modification
//     }

//     getSum(): number {
//         this.sum = this.questions.reduce((acc, question) => acc + question.chosenValue, 0);
//         return this.sum;
//     }

//     getResult(): classificationType {
//         try {
//             if (this.sum < this.classification.minimal.range.min) {
//                 return this.classification.minimal;
//             }
//             if (this.sum < this.classification.intermediate.range.min) {
//                 return this.classification.intermediate;
//             }
//             return this.classification.highDepending;
//         } catch (error) {
//             throw new Error('Error getting result');
//         }
//     }
// }
