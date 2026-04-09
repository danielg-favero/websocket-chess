import { Color } from "@modules/game/domain/objects/color.object";

export class Player {
  readonly id: string;
  readonly nickname: string;
  color: Color | null;

  constructor(id: string, nickname: string, color: Color | null = null) {
    this.id = id;
    this.nickname = nickname;
    this.color = color;
  }

  isWhite(): boolean {
    return !!this.color && this.color.isWhite();
  }

  isBlack(): boolean {
    return !!this.color && this.color.isBlack();
  }

  toJSON() {
    return {
      id: this.id,
      nickname: this.nickname,
      color: this.color ? this.color.toJSON() : null,
    };
  }
}
