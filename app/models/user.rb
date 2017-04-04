class User < ApplicationRecord;
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
  
  attr_accessor :stripe_card_token
  def save_with_subscription
    if valid?
       customer = Stripe::Customer.create(
       :email => params[:email],
       :source  => params[:stripe_card_token]
      )
      save!
    end
  end
end 