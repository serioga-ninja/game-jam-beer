export class MathHelper {
    public static random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
        const diff: number = max - min;

        return min + Math.ceil(
            (Math.random() * Number.MAX_SAFE_INTEGER) % diff
        );
    }
}
