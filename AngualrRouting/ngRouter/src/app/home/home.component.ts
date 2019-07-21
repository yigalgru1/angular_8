import { Component, OnInit } from '@angular/core';
import { LogService, LogLevel, LogEntry } from '../../shared/log.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LogService) {
    var aaa = 10;
  }

  // Public Properties
  logEntries: LogEntry[];

  toggleLogging(): void {
    this.logger.level = this.logger.level == LogLevel.All ? LogLevel.Off : LogLevel.All;
  }

  toggleDate(): void {
    this.logger.logWithDate = !this.logger.logWithDate;
  }

  clearLog(): void {
    this.logger.clear();
  }

  logTest(): void {
    this.logger.log("Test log() method");
  }

  debugTest(): void {
    this.logger.debug("Test debug() method");
  }

  infoTest(): void {
    this.logger.info("Test info() method");
  }

  warnTest(): void {
    this.logger.warn("Test warn() method");
  }

  errorTest(): void {
    this.logger.error("Test error() method");
  }

  fatalTest(): void {
    this.logger.fatal("Test fatal() method");
  }

  stringTest(): void {
    this.logger.log("Message and string test", "Paul", "Smith");
  }

  boolTest(): void {
    this.logger.log("Message and boolean test", true, false);
  }

  numberTest(): void {
    this.logger.log("Message and number test", 1, 2, 3, 4, 5);
  }

  arrayTest(): void {
    let values = ["1", "Paul", "Smith"];

    this.logger.log("Message and array test", "another string", values);
  }


  setOptionsTest(): void {
    // Get current logging level
    let oldLevel = this.logger.level;

    // Set level to error and above
    this.logger.level = LogLevel.Error;

    // Attempt some logging
    this.logger.log("This one should not show up");
    this.logger.warn("This one should not show up either");

    this.logger.error("This is an ERROR");
    this.logger.fatal("This is a FATAL ERROR");

    // Reset level back to old value
    this.logger.level = oldLevel;
  }


  ngOnInit() {
  }

}
