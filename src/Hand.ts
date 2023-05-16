export class Hand implements Iterable<number> {
    private readonly values: number[];

    constructor(...dice: number[]) {
        this.values = [...dice];
    }

    [Symbol.iterator](): Iterator<number> {
        let currentIndex = 0
        return {
            next: (value?: any): IteratorResult<number> => {
                return {
                    done: currentIndex >= this.values.length,
                    value: this.values[currentIndex++]
                }
            }
        }
    }

}