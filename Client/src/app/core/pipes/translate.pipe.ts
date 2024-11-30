import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../_services/translations/translation.service';

@Pipe({
  name: 'translate',
  standalone: true, // Mark this pipe as standalone
  pure: false, // Impure pipe to detect language changes
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: string): string {
    return this.translationService.getTranslation(value);
  }
}
