import { DIRECTION } from "../../shared/constants/direction.enum";

export class PlatformModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly destination: string,
    public readonly direction: DIRECTION) {}
}
