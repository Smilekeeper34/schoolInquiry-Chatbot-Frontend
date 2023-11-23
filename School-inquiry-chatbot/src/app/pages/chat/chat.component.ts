import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm = new FormGroup({
    userMessage: new FormControl(''),
    botResponse: new FormControl(''),
  });

  currentDate: Date;
  chatMessages: any[] = [];
  loading: boolean = false; // Add loading state

  constructor(private fb: FormBuilder, private chatService: ChatserviceService) {}

  ngOnInit() {
    this.updateCurrentDate();
    setInterval(() => {
      this.updateCurrentDate();
    }, 60000);
  }

  updateCurrentDate() {
    // Update the current date whenever needed
    this.currentDate = new Date();
  }

  sendMessage() {
    let userMessage = this.messageForm.get('userMessage')?.value;
    console.log('User Message:', userMessage);
  
    // Convert userMessage to lowercase
    userMessage = userMessage.toLowerCase();
  
    this.chatMessages.push({ content: userMessage, senderAvatar: 'https://uifaces.co/api-key-demo', type: 'user' });
    this.loading = true; // Set loading to true
  
    this.chatService.sendMessage(userMessage).subscribe(
      response => {
        const botResponse = response.message;
        this.chatMessages.push({ content: botResponse, senderAvatar: 'https://uifaces.co/api-key-demo', type: 'bot' });

        this.messageForm.get('userMessage')?.setValue('');
        this.loading = false; 
        console.log(response);
      },
      error => {
        console.error('Error sending message:', error);
        // Handle the error, e.g., display an error message to the user
        this.loading = false; 
      }
    );
  }
  
}
