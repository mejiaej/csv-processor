import { Controller, Post, Inject, Status } from '@tsed/common';
import { MultipartFile } from '@tsed/multipartfiles';
import { CsvProcessorService } from '../service/CsvProcessorService';

@Controller('/csv')
export class CsvController {
  @Inject()
  csvProcesorService: CsvProcessorService;

  @Post('/upload')
  @Status(202)
  private uploadCsv(@MultipartFile('file') file: Express.Multer.File) {
    const { path, destination, filename } = file;
    this.csvProcesorService.readCsvAndSaveCarData(path, destination, filename);
  }
}
