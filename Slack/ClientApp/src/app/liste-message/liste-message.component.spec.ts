/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ListeMessageComponent } from './liste-message.component';

let component: ListeMessageComponent;
let fixture: ComponentFixture<ListeMessageComponent>;

describe('liste-message component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListeMessageComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ListeMessageComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});