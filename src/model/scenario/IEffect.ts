export interface IEffect<T> {

    init(image: T): void;

    animateAsync(image: T): Promise<void>;

}
