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

  chatMessages: any[] = [];

  constructor(private fb: FormBuilder, private chatService: ChatserviceService) {}

  ngOnInit() {
    
  }

  sendMessage() {
    let userMessage = this.messageForm.get('userMessage')?.value;
    console.log('User Message:', userMessage);
  
    // Convert userMessage to lowercase
    userMessage = userMessage.toLowerCase();
  
    this.chatMessages.push({ content: userMessage, senderAvatar: '...user-avatar-url...' });
  
    this.chatService.sendMessage(userMessage).subscribe(
      response => {
        const botResponse = response.message;
        this.chatMessages.push({ content: botResponse, senderAvatar: '...bot-avatar-url...' });
        this.messageForm.get('userMessage')?.setValue('');
  
        console.log(response);
      },
      error => {
        console.error('Error sending message:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }
  
}
