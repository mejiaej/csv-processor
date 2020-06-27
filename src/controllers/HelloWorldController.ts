import { Controller, Post, Inject, Get } from '@tsed/common';
import { MultipartFile } from '@tsed/multipartfiles';
import { CsvProcessorService } from '../service/CsvProcessorService';

@Controller('/test')
export class CsvController {
  @Inject()
  csvProcesorService: CsvProcessorService;

  @Get('/')
  private uploadCsv() {
    return { test: true};
  }
}
