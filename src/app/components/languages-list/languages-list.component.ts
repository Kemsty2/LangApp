import { Component, OnInit } from '@angular/core';
import { OutPutModel } from 'src/app/interfaces/outputModel';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/services/language.service';

import {
  faPencilAlt,
  faTrash,
  faEye,
  faSearch,
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css'],
})
export class LanguagesListComponent implements OnInit {
  languages: OutPutModel<Language> = null;
  pencilIcon = faPencilAlt;
  trashIcon = faTrash;
  eyeIcon = faEye;
  searchIcon = faSearch;
  chevronLeftIcon = faChevronCircleLeft;
  chevronRightIcon = faChevronCircleRight;
  modalIsOpened = false;
  selectedId = '';

  currentLanguage: any = {
    language: '',
    speakLevel: '',
    writeLevel: '',
    comprehensionLevel: '',
  };
  action: string = '';
  languageForm: FormGroup = null;

  constructor(
    private languageService: LanguageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllLanguages();

    this.languageForm = new FormGroup({
      language: new FormControl('', [Validators.required]),
      speakLevel: new FormControl('', [Validators.required]),
      writeLevel: new FormControl('', [Validators.required]),
      comprehensionLevel: new FormControl('', [Validators.required]),
    });
  }

  getAllLanguages(): void {
    this.languageService
      .getLanguages({ isPaged: true, pageSize: 10, pageNumber: 1 })
      .subscribe((data) => {
        this.languages = data;
        console.log(data);
      }),
      (error: any) => {
        console.log(error);
      };
  }

  open(content: any, action: string, data: any) {
    this.modalIsOpened = true;
    this.currentLanguage = data;
    this.action = action;

    if (action === 'edit') {
      this.languageForm.patchValue({
        language: '1',
        speakLevel: '1',
        writeLevel: '1',
        comprehensionLevel: '1',
      });
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        (result) => {
          console.log(result);
        },
        () => {
          this.modalIsOpened = false;
        }
      );
  }

  openDeleteModal(content: any, id: string) {
    this.selectedId = id;

    this.modalService
      .open(content, {
        ariaDescribedBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  onSubmit(): void {
    if (this.action === 'edit') {
      this.languageService
        .updateLanguage(this.currentLanguage.id, this.languageForm.value)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.languages.data = this.languages.data.map((language) => {
              if (language.id === this.currentLanguage.id) {
                return response.data;
              }
              return language;
            });
            this.modalService.dismissAll();
          },
          (error) => {
            console.log(error);
            this.modalService.dismissAll();
          }
        );
    } else {
      this.languageService.postLanguage(this.languageForm.value).subscribe(
        (response: any) => {
          console.log(response);
          this.languages.data.push(response.data);
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
          this.modalService.dismissAll();
        }
      );
    }
  }

  deleteLanguage() {
    console.log(this.selectedId);
    this.languageService.deleteLanguage(this.selectedId).subscribe(
      (response: any) => {
        console.log(response);
        this.languages.data = this.languages.data.filter(
          (x) => x.id !== this.selectedId
        );
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.modalService.dismissAll();
      }
    );
  }

  get language() {
    return this.languageForm.get('language');
  }

  get speakLevel() {
    return this.languageForm.get('speakLevel');
  }

  get writeLevel() {
    return this.languageForm.get('writeLevel');
  }

  get comprehensionLevel() {
    return this.languageForm.get('comprehensionLevel');
  }
}
