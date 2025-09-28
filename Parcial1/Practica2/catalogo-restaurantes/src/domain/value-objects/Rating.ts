/**
 * Objeto de Valor: Rating
 * Representa la calificación y reseñas de un restaurante
 */
export class Rating {
  private readonly _score: number;
  private readonly _totalReviews: number;

  constructor(score: number, totalReviews: number) {
    this.validateScore(score);
    this.validateTotalReviews(totalReviews);
    
    this._score = score;
    this._totalReviews = totalReviews;
  }

  private validateScore(score: number): void {
    if (score < 0 || score > 5) {
      throw new Error('La calificación debe estar entre 0 y 5');
    }
    // Validar que tenga máximo 1 decimal
    if (score !== parseFloat(score.toFixed(1))) {
      throw new Error('La calificación solo puede tener 1 decimal');
    }
  }

  private validateTotalReviews(total: number): void {
    if (total < 0) {
      throw new Error('El total de reseñas no puede ser negativo');
    }
    if (!Number.isInteger(total)) {
      throw new Error('El total de reseñas debe ser un número entero');
    }
  }

  get score(): number {
    return this._score;
  }

  get totalReviews(): number {
    return this._totalReviews;
  }

  get stars(): string {
    const fullStars = Math.floor(this._score);
    const hasHalfStar = this._score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
  }

  get quality(): string {
    if (this._score >= 4.5) return 'Excelente';
    if (this._score >= 4.0) return 'Muy Bueno';
    if (this._score >= 3.5) return 'Bueno';
    if (this._score >= 3.0) return 'Regular';
    return 'Bajo';
  }

  public addReview(newScore: number): Rating {
    this.validateScore(newScore);
    const totalScore = this._score * this._totalReviews + newScore;
    const newTotalReviews = this._totalReviews + 1;
    const newAverageScore = parseFloat((totalScore / newTotalReviews).toFixed(1));
    
    return new Rating(newAverageScore, newTotalReviews);
  }

  public equals(other: Rating): boolean {
    return (
      this._score === other._score &&
      this._totalReviews === other._totalReviews
    );
  }

  public toString(): string {
    return `${this._score}/5 estrellas (${this._totalReviews} reseñas) - ${this.quality}`;
  }

  public toJSON(): object {
    return {
      score: this._score,
      totalReviews: this._totalReviews,
      stars: this.stars,
      quality: this.quality
    };
  }
}