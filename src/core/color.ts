const HEX_TABLE: string = '0123456789ABCDEF';
const HEX_TABLE_LEN: number = HEX_TABLE.length;
const COLOR_LENGTH: number = 255;

export class Color {
    get hex(): number {
        return this._hex;
    }

    get rgb(): number[] {
        return this._rgb;
    }

    private _rgb: number[];
    private _hex: number;

    public static rgbToHex(R: number, G: number, B: number): string {
        return Color.toHex(R) + Color.toHex(G) + Color.toHex(B);
    }

    public static toHex(color: number): string {
        if (isNaN(color)) return '00';
        color = Math.max(0, Math.min(color, COLOR_LENGTH));

        return HEX_TABLE.charAt((color - color % HEX_TABLE_LEN) / HEX_TABLE_LEN) + HEX_TABLE.charAt(color % HEX_TABLE_LEN);
    }

    public static hexToRGB(h: string): number[] {
        return [
            Color.hexToR(h),
            Color.hexToG(h),
            Color.hexToB(h)
        ];
    }

    private static hexToR(h: string): number {
        return parseInt((Color.cutHex(h)).substring(0, 2), HEX_TABLE_LEN);
    }

    private static hexToG(h: string): number {
        return parseInt((Color.cutHex(h)).substring(2, 4), HEX_TABLE_LEN);
    }

    private static hexToB(h: string): number {
        return parseInt((Color.cutHex(h)).substring(4, 6), HEX_TABLE_LEN);
    }

    private static cutHex(h: string): string {
        return (h.charAt(0) === '#') ? h.substring(1, 7) : h;
    }

    constructor(color: number | number[]) {
        if (typeof color === 'number') {
            this._hex = color;
            this._rgb = Color.hexToRGB(color.toString(HEX_TABLE_LEN));
        } else if (color instanceof Array && color.length === 3) {
            this._rgb = color;
            this._hex = parseInt(Color.rgbToHex(color[0], color[1], color[2]), 16);
        }
    }

    mix(rgb: number[]): void {
        this._rgb = [
            (this._rgb[0] + rgb[0]) / 2,
            (this._rgb[1] + rgb[1]) / 2,
            (this._rgb[1] + rgb[1]) / 2,
        ];

        this._hex = parseInt(Color.rgbToHex(this._rgb[0], this._rgb[1], this._rgb[2]), 16);
    }

}
