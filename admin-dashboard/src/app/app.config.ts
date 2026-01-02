import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { 
  TranslateLoader, 
  TranslateService,
  TranslateCompiler,
  TranslateParser,
  TranslateStore,
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { routes } from './app.routes';

// Custom HttpLoaderFactory
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return {
    getTranslation(lang: string): Observable<any> {
      return http.get(`./assets/i18n/${lang}.json`);
    }
  };
}

// Factory functions for TranslateCompiler and TranslateParser
export function TranslateCompilerFactory(): TranslateCompiler {
  return new (class implements TranslateCompiler {
    compile(value: string, lang: string): string {
      return value;
    }
    compileTranslations(translations: any, lang: string): any {
      return translations;
    }
  })();
}

export function TranslateParserFactory(): TranslateParser {
  return new (class implements TranslateParser {
    interpolate(expr: string, params?: any): string {
      if (!params) return expr;
      return expr.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
      });
    }
    getValue(target: any, key: string): any {
      return key.split('.').reduce((obj, k) => obj && obj[k], target);
    }
  })();
}

// MissingTranslationHandler implementation
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return params.key;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    {
      provide: TranslateCompiler,
      useFactory: TranslateCompilerFactory
    },
    {
      provide: TranslateParser,
      useFactory: TranslateParserFactory
    },
    {
      provide: MissingTranslationHandler,
      useClass: CustomMissingTranslationHandler
    },
    TranslateStore,
    TranslateService
  ]
};
