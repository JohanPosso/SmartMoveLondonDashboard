<script setup>
import BillingCard from "./components/BillingCard.vue";
import ModalTask from "../components/ModalTask.vue";
</script>
<template>
  <div class="container-fluid">
    <div class="col-lg-8">
      <div class="row mt-4">
        <div class="col-xl-6 mb-xl-0 mb-4">
          <master-card />
        </div>
        <div class="col-xl-6">
          <div class="row">
            <div class="col-md-6">
              <default-info-card
                :icon="{
                  component: 'fas fa-landmark',
                  background: 'bg-gradient-success',
                }"
                title="Salary"
                description="Belong Interactive"
                value="+$2000"
              />
            </div>
            <div class="col-md-6">
              <default-info-card
                :icon="{
                  component: 'fab fa-paypal',
                  background: 'bg-gradient-success',
                }"
                title="Paypal"
                description="Freelance Payment"
                value="$455.00"
              />
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-4">
          <payment-card />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <invoice-card class="mt-4" />
    </div>

    <div style="display: flex; justify-content: center">
      <div class="col-md-7">
        <ModalTask />

        <billing-card />
      </div>
    </div>
  </div>
</template>
