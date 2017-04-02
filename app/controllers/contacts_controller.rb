class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params) #<-- this sets the instance variable
    if @contact.save
      name = params[:contact][:name]
      email = params[:email]
      body = params[:contact][:comments]
      ContactMailer.contact_email(name, email, body).deliver #<--this is the action for actually sending the email
      default from: 'lucas.b.hickey@hotmail.com'
      flash[:success] = "Message Sent."
      redirect_to new_contact_path
    else 
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end


  private
    def contact_params  
      params.require(:contact).permit(:name, :email, :comments)
    end
end