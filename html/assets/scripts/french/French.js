import { Subject, Vocabulary } from '../Subject'

class French extends Subject {
    constructor() {
        super()
        this.items = [
            new Vocabulary(subject=this, image='flag_french.svg')
        ]
    }
}

export { French }