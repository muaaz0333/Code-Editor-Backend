import { Controller, Post, Body } from '@nestjs/common';
import { CodeExecutionService } from './code.service';

@Controller('code-execution')
export class CodeExecutionController {
  constructor(private readonly codeExecutionService: CodeExecutionService) {}

  @Post()
  async executeCode(
    @Body() body: { code: string; language: string },
  ): Promise<string> {
    console.log('Received request:', body);
    try {
      const result = await this.codeExecutionService.executeCode(
        body.code,
        body.language,
      );
      console.log('Execution result:', result);
      return result;
    } catch (error) {
      console.error('Error executing code:', error.message);
      return `Execution failed: ${error.message}`;
    }
  }
}
