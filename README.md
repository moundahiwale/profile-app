# Profile App

A simple profile application developed using Angular 10.  
The project demonstrates following key features of Angular:  
Components, services, forms module to create template driven forms, code separation best practices and understanding around the async operations involving promises.

**Saving Previous Profile States**  
The code uses **memento design pattern** to save the previous profile states. The previous profile states are used to revert the profile in case the update profile name or email generation service erros out.  
The equivalent classes are:    
Originator: ProfileSettingsComponent  
Memento: ProfileState  
Caretaker: ProfileStateHistory  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Considerations for production applications

Among other things, writing automated unit, integration and e2e tests is recommended.
