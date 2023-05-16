type DieCount = {
    die: number,
    count: number
}

export default class Yatzy {

    static chance(...dice: number[]): number {
        return dice.reduce((current: number, next: number) => current + next, 0);
    }

    static yatzy(...args: number[]): number {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i != args.length; ++i) {
            var die = args[i];
            counts[die - 1]++;
        }
        for (i = 0; i != 6; i++) if (counts[i] == 5) return 50;
        return 0;
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

    static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
        return 0;
    }

    static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
        return 0;
    }

    static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        var _2 = false;
        var i;
        var _2_at = 0;
        var _3 = false;
        var _3_at = 0;

        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 2) {
                _2 = true;
                _2_at = i + 1;
            }

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 3) {
                _3 = true;
                _3_at = i + 1;
            }

        if (_2 && _3) return _2_at * 2 + _3_at * 3;
        else return 0;
    }


}
