import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('msgContainer') msgContainer: ElementRef;

  messageForm = new FormGroup({
    userMessage: new FormControl(''),
    botResponse: new FormControl(''),
  });

  currentDate: Date;
  chatMessages: any[] = [];
  loading: boolean = false;

  constructor(private fb: FormBuilder, private chatService: ChatserviceService) {}

  ngOnInit() {
    this.updateCurrentDate();
    setInterval(() => {
      this.updateCurrentDate();
    }, 60000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  updateCurrentDate() {
    this.currentDate = new Date();
  }

  sendMessage() {
    let userMessage = this.messageForm.get('userMessage')?.value;
    userMessage = userMessage.toLowerCase();
  
    this.chatMessages.push({ content: userMessage, senderAvatar: 'https://uifaces.co/api-key-demo', type: 'user' });
    this.loading = true;

    this.chatService.sendMessage(userMessage).subscribe(
      response => {
        const botResponse = response.message;
        this.chatMessages.push({ content: botResponse, senderAvatar: 'https://uifaces.co/api-key-demo', type: 'bot' });

        this.messageForm.get('userMessage')?.setValue('');
        this.loading = false;
      },
      error => {
        console.error('Error sending message:', error);
        this.loading = false;
      }
    );
  }

  scrollToBottom() {
    try {
      this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
