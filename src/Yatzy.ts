type DieCount = {
    die: number,
    count: number
}

export default class Yatzy {

    static chance(...dice: number[]): number {
        return dice.reduce((current: number, next: number) => current + next, 0);
    }

    static yatzy(...args: number[]): number {
        return this.minOccurrence(args, 5).length > 0 ? 50 : 0;
    }

    static ones(...dice: number[]): number {
        return this.scoreDigits(dice, 1);
    }

    static scoreDigits(dice: number[], digit: number) {
        return dice.filter(x => x === digit)
            .reduce((acc, curr) => acc + curr, 0)
    }

    static twos(...dice: number[]): number {
        return this.scoreDigits(dice, 2);
    }

    static threes(...dice: number[]): number {
        return this.scoreDigits(dice, 3);
    }

    static fours(...dice: number[]): number {
        return this.scoreDigits(dice, 4);
    }

    static fives(...dice: number[]): number {
        return this.scoreDigits(dice, 5);
    }

    static sixes(...dice: number[]): number {
        return this.scoreDigits(dice, 6);
    }

    static onePair(...dice: number[]): number {
        const pairs = this.minOccurrence(dice, 2);
        if (pairs.length === 0) {
            return 0;
        } else {
            return Math.max(...pairs) * 2;
        }
    }

    private static freq(dice: number[]): DieCount[] {
        const freq = new Array(6).fill(0);
        for (const d of dice) {
            freq[d - 1]++;
        }

        return Array.from(freq.entries())
            .map(entry => ({
                    die: entry[0] + 1,
                    count: entry[1],
                })
            )
    }

    private static minOccurrence(dice: number[], minCount: number) {
        return this.freq(dice)
            .filter(f => f.count >= minCount)
            .map(f => f.die);
    }

    static twoPairs(...dice: number[]): number {
        let pairs = this.minOccurrence(dice, 2);
        return pairs.length >= 2 ? (pairs[0] + pairs[1]) * 2 : 0;
    }

    static fourOfAKind(...dice: number[]): number {
        let fourOf = this.minOccurrence(dice, 4);
        return fourOf.length === 0 ? 0 : fourOf[0] * 4;
    }

    static threeOfAKind(...dice: number[]): number {
        let triple = this.minOccurrence(dice, 3);
        return triple.length === 0 ? 0 : triple[0] * 3;
    }

    static straight(dice: number[], start: number, end: number) {
        const freq = this.freq(dice);
        for (let die = start; die <= end; die++) {
            const dc = freq.find(d => d.die === die);
            if (!dc || dc.count === 0) {
                return 0;
            }
        }
        // The sum of an arithmetic progression
        return ((end - start + 1) * (start + end)) / 2;
    }

    static smallStraight(...dice: number[]): number {
        return this.straight(dice, 1, 5);
    }

    static largeStraight(...dice: number[]): number {
        return this.straight(dice, 2, 6);
    }

    static fullHouse(...dice: number[]): number {
        const freq = this.freq(dice);
        const d2 = freq.find(d => d.count === 2);
        const d3 = freq.find(d => d.count === 3);
        if (d2 && d3) {
            return d2.die * 2 + d3.die * 3;
        } else {
            return 0;
        }
    }


}
